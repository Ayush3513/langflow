import React, { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from './ui/card';
import { Input } from './ui/input';
import { Button } from './ui/button';
import { Badge } from './ui/badge';
import { AlertCircle, CheckCircle2, Key } from 'lucide-react';

interface ApiKey {
  key: string;
  name: string;
  description: string;
  isRequired: boolean;
}

const apiKeys: ApiKey[] = [
  {
    key: 'OPENAI_API_KEY',
    name: 'OpenAI API Key',
    description: 'Required for AI analysis and processing',
    isRequired: true,
  },
  {
    key: 'YOUTUBE_API_KEY',
    name: 'YouTube API Key',
    description: 'Required for YouTube data analysis',
    isRequired: true,
  },
  {
    key: 'GOOGLE_API_KEY',
    name: 'Google API Key',
    description: 'Required for Google search analysis',
    isRequired: true,
  },
  {
    key: 'TWITTER_API_KEY',
    name: 'Twitter API Key',
    description: 'Required for Twitter data analysis',
    isRequired: false,
  },
  {
    key: 'REDDIT_API_KEY',
    name: 'Reddit API Key',
    description: 'Required for Reddit data analysis',
    isRequired: false,
  },
];

export function Settings() {
  const [keys, setKeys] = useState<Record<string, string>>({});
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    // Load saved keys from localStorage
    const savedKeys = localStorage.getItem('api_keys');
    if (savedKeys) {
      setKeys(JSON.parse(savedKeys));
    }
  }, []);

  const handleSave = async () => {
    setSaving(true);
    try {
      // Save to localStorage
      localStorage.setItem('api_keys', JSON.stringify(keys));
      // You might want to validate keys here
      setTimeout(() => setSaving(false), 1000);
    } catch (error) {
      console.error('Error saving API keys:', error);
      setSaving(false);
    }
  };

  const isKeyValid = (key: string) => {
    return keys[key] && keys[key].length > 10;
  };

  return (
    <Card className="w-full max-w-2xl mx-auto">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Key className="h-5 w-5" />
          API Settings
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        {apiKeys.map((api) => (
          <div key={api.key} className="space-y-2">
            <div className="flex items-center justify-between">
              <div>
                <label className="text-sm font-medium">{api.name}</label>
                <p className="text-sm text-muted-foreground">{api.description}</p>
              </div>
              <div className="flex items-center gap-2">
                {api.isRequired && (
                  <Badge variant="secondary">Required</Badge>
                )}
                {isKeyValid(api.key) ? (
                  <CheckCircle2 className="h-4 w-4 text-green-500" />
                ) : (
                  <AlertCircle className="h-4 w-4 text-yellow-500" />
                )}
              </div>
            </div>
            <Input
              type="password"
              placeholder={`Enter your ${api.name}`}
              value={keys[api.key] || ''}
              onChange={(e) => setKeys({ ...keys, [api.key]: e.target.value })}
            />
          </div>
        ))}
        <Button 
          className="w-full mt-4" 
          onClick={handleSave}
          disabled={saving}
        >
          {saving ? 'Saving...' : 'Save API Keys'}
        </Button>
      </CardContent>
    </Card>
  );
}
