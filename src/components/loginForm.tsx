import { Tabs, TabsContent, TabsList, TabsTrigger } from "@radix-ui/react-tabs";
import { useState } from "react";
import { Card, CardContent } from "./ui/card";
import qPass from '../assets/images/Q-pass.svg'
import tawtheeq from '../assets/images/Tawtheeq-logo.svg'
import { Label } from "@radix-ui/react-label";
import { Input } from "./ui/input";
import { Mail, Lock } from "lucide-react"
import { Button } from "./ui/button";
import { useNavigate } from "react-router-dom";


const LoginForm = () => {
  const [activeTab, setActiveTab] = useState("nasq");
  const [formData, setFormData] = useState({ email: "", password: "" })
  const [errors, setErrors] = useState<{ email?: string; password?: string }>({})
  const navigate = useNavigate();
  

  const validateEmail = (value: string) =>
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: typeof errors = {}

    if (!validateEmail(formData.email)) {
      newErrors.email = "Please Enter Valid Email Address"
    }

    if (formData.password.length < 6) {
      newErrors.password = "Please Enter Valid Email Password"
    }

    setErrors(newErrors)

    if (Object.keys(newErrors).length === 0) {
      console.log("Form submitted:", { email: formData.email, password: formData.password })
      // Trigger login logic here
      navigate("/portal")
    }
  }
  
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    console.log('value: ', value);
    console.log('name: ', name);

    setFormData((prev) => ({ ...prev, [name]: value }))

    // Clear error for the field being typed into
    if (errors[name as keyof typeof errors]) {
      setErrors((prev) => ({ ...prev, [name]: undefined }))
    }
  }

  return (
    <Tabs value={activeTab} onValueChange={setActiveTab} className="w-[360px]">
      <TabsList className="grid w-full grid-cols-2 mt-6 mb-8 bg-white p-1 rounded-lg h-10">
        <TabsTrigger value="nasq" className="data-[state=active]:bg-[#862634] data-[state=active]:text-white rounded-lg data-[state=active]:font-semibold" >
          NAS/Q-PASS
        </TabsTrigger>
        <TabsTrigger value="others" className="data-[state=active]:bg-[#862634] data-[state=active]:text-white rounded-lg data-[state=active]:font-semibold">
          Others
        </TabsTrigger>
      </TabsList>

      {/* NAS/Q-PASS Tab */}
      <TabsContent value="nasq" className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-[#862634]">
            <CardContent className="flex items-center justify-center space-y-3" onClick={() => navigate(`/portal`)}>
              <img src={tawtheeq} alt="Tawtheeq" className="h-[72px] w-[72px]"/>
            </CardContent>
          </Card>

          <Card className="cursor-pointer hover:shadow-md transition-shadow border-2 hover:border-[#862634]">
            <CardContent className="flex items-center justify-center space-y-3" onClick={() => navigate("/portal")}>
              <img src={qPass} alt="Q-Pass" className="h-[72px] w-[72px]" />
            </CardContent>
          </Card>
        </div>
      </TabsContent>

      {/* Others Tab */}
      <TabsContent value="others" className="">
        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <div className="relative">
              <Mail className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="email"
                type="email"
                name="email"
                value={formData.email}
                placeholder="Email address"
                onChange={handleChange}
                className={`pl-10 ${errors.email && 'border-red-600'}`}
              />
            </div>
            {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
          </div>

          <div className="space-y-2">
            <Label htmlFor="password">Password</Label>
            <div className="relative">
              <Lock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="password"
                type="password"
                name="password"
                value={formData.password}
                placeholder="Enter password"
                onChange={handleChange}
                className={`pl-10 ${errors.password && 'border-red-600'}`}
              />
            </div>
            {errors.password && <p className="text-sm text-red-600">{errors.password}</p>}
          </div>

          <Button type="submit" className="w-full bg-[#862634] hover:bg-[#7A1F2B] text-white" size="lg">
            Login
          </Button>
        </form>
      </TabsContent>
    </Tabs>
  )
}

export default LoginForm