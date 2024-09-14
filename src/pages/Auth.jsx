import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Leaf } from 'lucide-react';
import DonationForm from '../components/DonationForm';

const Auth = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showDonationForm, setShowDonationForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = (e, action) => {
    e.preventDefault();
    if (action === 'signup') {
      setShowDonationForm(true);
    } else {
      // TODO: Implement actual authentication logic
      console.log(`${action} with`, { email, password });
      navigate('/dashboard');
    }
  };

  const handleDonationComplete = () => {
    // TODO: Implement actual user creation logic
    console.log('User signed up with donation');
    navigate('/dashboard');
  };

  if (showDonationForm) {
    return <DonationForm onComplete={handleDonationComplete} />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-teal-50 to-teal-100">
      <Card className="w-full max-w-md bg-white bg-opacity-90 backdrop-blur-sm shadow-xl border-teal-200">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-teal-700 flex items-center justify-center">
            <Leaf className="mr-2 h-8 w-8 text-teal-500" />
            Join Oosh
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="signup">
            <TabsList className="grid w-full grid-cols-2 mb-6">
              <TabsTrigger value="signup" className="text-teal-700 data-[state=active]:bg-teal-100">Sign Up</TabsTrigger>
              <TabsTrigger value="login" className="text-teal-700 data-[state=active]:bg-teal-100">Login</TabsTrigger>
            </TabsList>
            <TabsContent value="signup">
              <form onSubmit={(e) => handleSubmit(e, 'signup')}>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-teal-300 focus:ring-teal-500"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-teal-300 focus:ring-teal-500"
                  />
                  <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">Sign Up & Gift</Button>
                </div>
              </form>
            </TabsContent>
            <TabsContent value="login">
              <form onSubmit={(e) => handleSubmit(e, 'login')}>
                <div className="space-y-4">
                  <Input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className="border-teal-300 focus:ring-teal-500"
                  />
                  <Input
                    type="password"
                    placeholder="Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                    className="border-teal-300 focus:ring-teal-500"
                  />
                  <Button type="submit" className="w-full bg-teal-500 hover:bg-teal-600 text-white">Login</Button>
                </div>
              </form>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Auth;
