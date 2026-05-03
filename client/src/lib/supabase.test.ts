import { describe, it, expect } from 'vitest';
import { supabase } from './supabase';

describe('Supabase Connection', () => {
  it('should connect to Supabase with valid credentials', async () => {
    try {
      // Test the connection by attempting to get the current session
      const { data: sessionData, error: sessionError } = await supabase.auth.getSession();
      
      // Connection should succeed even if no session exists
      expect(sessionError).toBeNull();
      expect(sessionData).toBeDefined();
    } catch (error) {
      throw new Error(`Failed to connect to Supabase: ${String(error)}`);
    }
  });

  it('should have valid environment variables configured', () => {
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

    expect(supabaseUrl).toBeDefined();
    expect(supabaseUrl).toMatch(/^https:\/\//);
    expect(supabaseAnonKey).toBeDefined();
    expect(supabaseAnonKey.length).toBeGreaterThan(0);
  });
});
