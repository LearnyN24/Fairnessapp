import { useState } from "react";
import { ArrowLeft, Camera, Check, X } from "lucide-react";
import { Link } from "react-router-dom";
import Layout from "@/components/layout/Layout";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { useSettings } from "@/context/SettingsContext";
import { useAuth } from "@/context/AuthContext";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { useToast } from "@/components/ui/use-toast";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

const Profile = () => {
  const { settings, updateSettings } = useSettings();
  const { user, updateUserProfile, updatePassword } = useAuth();
  const { toast } = useToast();
  const [isUploading, setIsUploading] = useState(false);
  const [isChangingPassword, setIsChangingPassword] = useState(false);
  const [isEnabling2FA, setIsEnabling2FA] = useState(false);
  const [passwordData, setPasswordData] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: ""
  });
  const [twoFactorCode, setTwoFactorCode] = useState("");
  const [showQRCode, setShowQRCode] = useState(false);

  const displayName = settings.name || user?.name || "User";
  const initials = displayName
    .split(' ')
    .map(name => name[0])
    .join('')
    .toUpperCase();

  const handleProfilePictureChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setIsUploading(true);
    
    try {
      // In a real app, you would upload the file to a server
      // and get back a URL to store in the user's profile
      const fakeImageUrl = URL.createObjectURL(file);
      
      // Update the user's photo URL in the auth context
      await updateUserProfile({ photoURL: fakeImageUrl });
      
      toast({
        title: "Profile picture updated",
        description: "Your profile picture has been successfully updated.",
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update profile picture. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsUploading(false);
    }
  };

  const handlePasswordChange = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (passwordData.newPassword !== passwordData.confirmPassword) {
      toast({
        title: "Error",
        description: "New passwords do not match.",
        variant: "destructive",
      });
      return;
    }
    
    setIsChangingPassword(true);
    
    try {
      await updatePassword(passwordData.currentPassword, passwordData.newPassword);
      
      toast({
        title: "Password updated",
        description: "Your password has been successfully changed.",
      });
      
      setPasswordData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: ""
      });
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to update password. Please check your current password and try again.",
        variant: "destructive",
      });
    } finally {
      setIsChangingPassword(false);
    }
  };

  const handleEnable2FA = () => {
    setIsEnabling2FA(true);
    setShowQRCode(true);
    
    // Simulate 2FA setup
    setTimeout(() => {
      // In a real app, you would generate a QR code for the user to scan
      toast({
        title: "2FA Setup initiated",
        description: "Please scan the QR code with your authenticator app.",
      });
    }, 1000);
  };

  const handleVerify2FA = () => {
    if (twoFactorCode.length !== 6) {
      toast({
        title: "Invalid code",
        description: "Please enter a valid 6-digit code.",
        variant: "destructive",
      });
      return;
    }
    
    // Simulate 2FA verification
    setTimeout(() => {
      toast({
        title: "2FA Enabled",
        description: "Two-factor authentication has been successfully enabled for your account.",
      });
      
      setTwoFactorCode("");
      setShowQRCode(false);
      setIsEnabling2FA(false);
    }, 1500);
  };

  return (
    <Layout activePage="profile">
      <section className="mb-8">
        <div className="flex items-center gap-4 mb-6">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/">
              <ArrowLeft className="h-4 w-4" />
            </Link>
          </Button>
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Profile</h1>
            <p className="text-muted-foreground">
              View and manage your account information
            </p>
          </div>
        </div>
      </section>

      <div className="grid gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Account Information</CardTitle>
            <CardDescription>Your personal and account details</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="flex items-center gap-4">
              <div className="relative">
                <Avatar className="h-20 w-20">
                  <AvatarImage src={user?.photoURL} alt={displayName} />
                  <AvatarFallback className="text-2xl">{initials}</AvatarFallback>
                </Avatar>
                <label 
                  htmlFor="profile-picture" 
                  className="absolute bottom-0 right-0 bg-primary text-primary-foreground rounded-full p-1.5 cursor-pointer hover:bg-primary/90"
                >
                  <Camera className="h-4 w-4" />
                </label>
                <input 
                  id="profile-picture" 
                  type="file" 
                  accept="image/*" 
                  className="hidden" 
                  onChange={handleProfilePictureChange}
                  disabled={isUploading}
                />
              </div>
              <div>
                <h3 className="text-lg font-medium">{displayName}</h3>
                <p className="text-sm text-muted-foreground">{settings.email || user?.email}</p>
              </div>
            </div>

            <div className="grid gap-4">
              <div>
                <h4 className="text-sm font-medium mb-2">Name</h4>
                <p className="text-sm text-muted-foreground">{displayName}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Email</h4>
                <p className="text-sm text-muted-foreground">{settings.email || user?.email}</p>
              </div>
              <div>
                <h4 className="text-sm font-medium mb-2">Account Type</h4>
                <p className="text-sm text-muted-foreground">Standard Account</p>
              </div>
            </div>

            <div className="flex justify-end">
              <Button asChild>
                <Link to="/settings">Edit Profile</Link>
              </Button>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Account Security</CardTitle>
            <CardDescription>Manage your account security settings</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Two-Factor Authentication</h4>
                <p className="text-sm text-muted-foreground">Add an extra layer of security to your account</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Enable</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Set up Two-Factor Authentication</DialogTitle>
                    <DialogDescription>
                      Enhance your account security by enabling two-factor authentication.
                    </DialogDescription>
                  </DialogHeader>
                  
                  {!showQRCode ? (
                    <div className="py-4">
                      <p className="text-sm mb-4">
                        Two-factor authentication adds an extra layer of security to your account. 
                        When enabled, you'll need to enter a code from your authenticator app in addition to your password when signing in.
                      </p>
                      <Button 
                        onClick={handleEnable2FA} 
                        disabled={isEnabling2FA}
                        className="w-full"
                      >
                        {isEnabling2FA ? "Setting up..." : "Set up 2FA"}
                      </Button>
                    </div>
                  ) : (
                    <div className="py-4 space-y-4">
                      <div className="bg-muted p-4 rounded-md flex justify-center">
                        <div className="bg-white p-2 rounded">
                          {/* This would be a real QR code in a production app */}
                          <div className="w-48 h-48 bg-gray-200 flex items-center justify-center">
                            <span className="text-xs text-muted-foreground">QR Code Placeholder</span>
                          </div>
                        </div>
                      </div>
                      <p className="text-sm">
                        1. Scan this QR code with your authenticator app (like Google Authenticator, Authy, or Microsoft Authenticator)
                      </p>
                      <p className="text-sm">
                        2. Enter the 6-digit code from your app to verify setup
                      </p>
                      <div className="space-y-2">
                        <Label htmlFor="2fa-code">Verification Code</Label>
                        <Input 
                          id="2fa-code" 
                          placeholder="Enter 6-digit code" 
                          value={twoFactorCode}
                          onChange={(e) => setTwoFactorCode(e.target.value)}
                          maxLength={6}
                        />
                      </div>
                      <div className="flex justify-between pt-2">
                        <Button 
                          variant="outline" 
                          onClick={() => setShowQRCode(false)}
                        >
                          Back
                        </Button>
                        <Button 
                          onClick={handleVerify2FA}
                          disabled={twoFactorCode.length !== 6}
                        >
                          Verify
                        </Button>
                      </div>
                    </div>
                  )}
                </DialogContent>
              </Dialog>
            </div>
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium">Password</h4>
                <p className="text-sm text-muted-foreground">Change your account password</p>
              </div>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline">Change</Button>
                </DialogTrigger>
                <DialogContent>
                  <DialogHeader>
                    <DialogTitle>Change Password</DialogTitle>
                    <DialogDescription>
                      Enter your current password and choose a new one.
                    </DialogDescription>
                  </DialogHeader>
                  <form onSubmit={handlePasswordChange} className="space-y-4 py-4">
                    <div className="space-y-2">
                      <Label htmlFor="current-password">Current Password</Label>
                      <Input 
                        id="current-password" 
                        type="password" 
                        value={passwordData.currentPassword}
                        onChange={(e) => setPasswordData({...passwordData, currentPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="new-password">New Password</Label>
                      <Input 
                        id="new-password" 
                        type="password" 
                        value={passwordData.newPassword}
                        onChange={(e) => setPasswordData({...passwordData, newPassword: e.target.value})}
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="confirm-password">Confirm New Password</Label>
                      <Input 
                        id="confirm-password" 
                        type="password" 
                        value={passwordData.confirmPassword}
                        onChange={(e) => setPasswordData({...passwordData, confirmPassword: e.target.value})}
                        required
                      />
                    </div>
                    <DialogFooter>
                      <Button type="submit" disabled={isChangingPassword}>
                        {isChangingPassword ? "Updating..." : "Update Password"}
                      </Button>
                    </DialogFooter>
                  </form>
                </DialogContent>
              </Dialog>
            </div>
          </CardContent>
        </Card>
      </div>
    </Layout>
  );
};

export default Profile;
