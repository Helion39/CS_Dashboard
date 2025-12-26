import { createClient } from '@supabase/supabase-js';

// Supabase client for browser (client-side)
export const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
);



// Types for database tables
export interface User {
    id: string;
    name: string;
    email: string;
    password: string;
    role: 'senior' | 'junior' | 'it' | 'admin';
    avatar: string | null;
    created_at: string;
    updated_at: string;
}

export interface Ticket {
    id: string;
    number: string;
    subject: string;
    description: string | null;
    priority: 'HIGH' | 'MEDIUM' | 'LOW';
    status: 'OPEN' | 'TRIAGE' | 'IN_PROGRESS' | 'RESOLVED' | 'CLOSED' | 'PENDING_REVIEW' | 'WITH_IT';
    source: string;
    customer_name: string;
    customer_email: string | null;
    customer_phone: string | null;
    assigned_to_id: string | null;
    created_by_id: string | null;
    created_at: string;
    updated_at: string;
    closed_at: string | null;
    // Joined data
    assigned_to?: User;
    created_by?: User;
}

export interface Note {
    id: string;
    content: string;
    user_id: string;
    ticket_id: string;
    created_at: string;
    // Joined data
    user?: User;
}

export interface Activity {
    id: string;
    action: string;
    details: string | null;
    user_id: string;
    ticket_id: string | null;
    created_at: string;
    // Joined data
    user?: User;
    ticket?: Ticket;
}

// Chat Types
export interface Conversation {
    id: string;
    type: 'direct' | 'group';
    name: string | null;
    created_at: string;
    updated_at: string;
    last_message: string | null;
    last_message_at: string | null;
}

export interface ConversationParticipant {
    conversation_id: string;
    user_id: string;
    joined_at: string;
    last_read_at: string;
}

export interface Message {
    id: string;
    conversation_id: string;
    sender_id: string;
    content: string;
    type: 'text' | 'image' | 'file';
    file_url: string | null;
    created_at: string;
    updated_at: string;
    read_by: string[]; // JSONB array of user IDs
    // Joined data
    sender?: User;
}
