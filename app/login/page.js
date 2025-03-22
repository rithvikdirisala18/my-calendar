import React from 'react'
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import LoginCard from './logincard';

const LoginPage = () => {
  return (
    <div className="flex min-h-screen items-center justify-center px-6 py-12">
      <Card className="w-full max-w-md p-6 shadow-lg hover:shadow-2xl bg-[#181818]">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-orange-400 text-3xl justify-center">
            Login
          </CardTitle>
        </CardHeader>
        <CardContent>
            <LoginCard/>
        </CardContent>
      </Card>
    </div>
  )
}

export default LoginPage