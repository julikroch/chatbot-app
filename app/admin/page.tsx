import { getUsers } from '@/common/api/get';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui';

import { UsersCard } from './UsersCard';

export default async function AdminPage() {
  const { users, error } = await getUsers();

  if (error || !users) {
    return (
      <Alert variant="destructive">
        <AlertTitle>Error</AlertTitle>
        <AlertDescription>
          {error ?? 'An error occurred while getting the users. Please try again later.'}
        </AlertDescription>
      </Alert>
    );
  }

  if (!users.length) {
    return (
      <Alert>
        <AlertTitle>No users found</AlertTitle>
        <AlertDescription>Please create a user to start seeing the list</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold">Users</h2>
      <div className="grid xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {users.map(user => (
          <UsersCard key={user.userName} user={user} />
        ))}
      </div>
    </div>
  );
}
