
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";

const UserProfile = () => {
  const { user, signOut } = useAuth();

  if (!user) return null;

  const initials = user.name
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  return (
    <Card className="w-full max-w-md mx-auto">
      <CardHeader className="text-center">
        <div className="flex justify-center mb-4">
          <Avatar className="h-24 w-24">
            <AvatarImage src={user.photoURL} alt={user.name} />
            <AvatarFallback className="text-lg">{initials}</AvatarFallback>
          </Avatar>
        </div>
        <CardTitle className="text-2xl">{user.name}</CardTitle>
        <CardDescription>{user.email}</CardDescription>
        {user.provider && (
          <div className="mt-2 text-sm text-muted-foreground">
            Sign in method: {user.provider}
          </div>
        )}
      </CardHeader>
      <CardContent className="flex justify-center">
        <Button variant="outline" onClick={signOut}>Sign Out</Button>
      </CardContent>
    </Card>
  );
};

export default UserProfile;
