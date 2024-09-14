import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { supabase } from '../supabase';

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

/*
### Chats

| name       | type                     | format | required |
|------------|--------------------------|--------|----------|
| id         | int8                     | number | true     |
| created_at | timestamp with time zone | string | true     |

Note: 
- 'id' is the Primary Key.
- 'created_at' has a default value of now().

No foreign key relationships are defined for this table.
*/

export const useChats = () => useQuery({
    queryKey: ['chats'],
    queryFn: () => fromSupabase(supabase.from('Chats').select('*')),
});

export const useChat = (id) => useQuery({
    queryKey: ['chats', id],
    queryFn: () => fromSupabase(supabase.from('Chats').select('*').eq('id', id).single()),
    enabled: !!id,
});

export const useAddChat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: () => fromSupabase(supabase.from('Chats').insert([])),
        onSuccess: () => {
            queryClient.invalidateQueries('chats');
        },
    });
};

export const useUpdateChat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: ({ id, ...updateData }) => 
            fromSupabase(supabase.from('Chats').update(updateData).eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('chats');
        },
    });
};

export const useDeleteChat = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (id) => fromSupabase(supabase.from('Chats').delete().eq('id', id)),
        onSuccess: () => {
            queryClient.invalidateQueries('chats');
        },
    });
};