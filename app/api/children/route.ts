import { createClient } from '@/lib/supabase/server';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const { data: children, error } = await supabase
      .from('child_profiles')
      .select('*')
      .eq('user_id', user.id)
      .order('created_at', { ascending: false });

    if (error) throw error;

    return NextResponse.json(children);
  } catch (error: any) {
    console.error('Error fetching children:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function POST(req: Request) {
  try {
    const supabase = await createClient();
    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
    }

    const body = await req.json();
    const { name, age, avatar_url, appearance } = body;

    if (!name || !age) {
      return NextResponse.json({ error: 'Name and age are required' }, { status: 400 });
    }

    const { data: child, error } = await supabase
      .from('child_profiles')
      .insert({
        user_id: user.id,
        name,
        age,
        avatar_url,
        appearance,
      })
      .select()
      .single();

    if (error) throw error;

    return NextResponse.json(child);
  } catch (error: any) {
    console.error('Error creating child profile:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
