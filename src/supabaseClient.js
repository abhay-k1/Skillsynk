import { createClient } from '@supabase/supabase-js';

const supabaseUrl = 'https://cgwbwfkxerhsrwtigcbw.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImNnd2J3Zmt4ZXJoc3J3dGlnY2J3Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODQxODQ1MjMsImV4cCI6MjA5OTc2MDUyM30.Ds2nja3th6ZBi0vi2QUXoo5mtKm0aqNqkVmyLXF1ZAc';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
