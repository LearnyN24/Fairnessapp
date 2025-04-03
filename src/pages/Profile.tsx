
import Layout from "@/components/layout/Layout";
import { useAuth } from "@/context/AuthContext";
import UserProfile from "@/components/user/UserProfile";
import { Navigate } from "react-router-dom";

const Profile = () => {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <Layout activePage="profile">
        <div className="flex justify-center items-center h-[50vh]">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
        </div>
      </Layout>
    );
  }

  if (!user) {
    return <Navigate to="/signin" />;
  }

  return (
    <Layout activePage="profile">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold tracking-tight mb-6">Your Profile</h1>
        <UserProfile />
      </div>
    </Layout>
  );
};

export default Profile;
