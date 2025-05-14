import React, { useState } from 'react';
import { supabase } from '../../lib/supabase';
import Button from '../ui/Button';

export default function CreateOrganization() {
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      // Generate slug from name
      const slug = name.toLowerCase().replace(/\s+/g, '-');

      // Insert organization
      const { data: org, error: orgError } = await supabase
        .from('organizations')
        .insert({ name, slug })
        .select()
        .single();

      if (orgError) throw orgError;

      // Add current user as owner
      const { error: memberError } = await supabase
        .from('organization_members')
        .insert({
          organization_id: org.id,
          user_id: (await supabase.auth.getUser()).data.user?.id,
          role: 'owner'
        });

      if (memberError) throw memberError;

      // Reset form
      setName('');
    } catch (err) {
      setError('Failed to create organization');
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">
          Organization Name
        </label>
        <input
          id="name"
          type="text"
          required
          className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      {error && (
        <div className="text-red-600 text-sm">{error}</div>
      )}
      <Button
        type="submit"
        variant="primary"
        className="w-full"
        isLoading={loading}
      >
        Create Organization
      </Button>
    </form>
  );
}