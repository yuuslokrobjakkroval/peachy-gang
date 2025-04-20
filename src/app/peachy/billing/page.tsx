"use client";

import { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { CreditCard, CheckCircle, Calendar, Lock } from "lucide-react";

export default function BillingPage() {
  const [paymentMethod, setPaymentMethod] = useState("credit-card");
  const [plan, setPlan] = useState("monthly");

  const plans: any = {
    monthly: {
      basic: "$9.99",
      pro: "$19.99",
      enterprise: "$49.99",
    },
    yearly: {
      basic: "$99.99",
      pro: "$199.99",
      enterprise: "$499.99",
    },
  };

  return (
    <div className="container mx-auto py-10 px-4 md:px-6 bg-background relative">
      <div className="texture"></div>
      <div className="max-w-5xl mx-auto relative z-10">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground-bold">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-3">
          <div className="md:col-span-2">
            <Tabs defaultValue="payment" className="w-full">
              <TabsList className="grid w-full grid-cols-2 bg-card border-border ">
                <TabsTrigger
                  value="payment"
                  className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Payment Method
                </TabsTrigger>
                <TabsTrigger
                  value="history"
                  className="text-foreground data-[state=active]:bg-primary data-[state=active]:text-primary-foreground"
                >
                  Payment History
                </TabsTrigger>
              </TabsList>
              <TabsContent value="payment" className="mt-4">
                <Card className="bg-card border-border">
                  <CardHeader>
                    <CardTitle className="text-foreground-bold">
                      Payment Method
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      Add a new payment method or update your existing one
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    <RadioGroup
                      defaultValue="credit-card"
                      value={paymentMethod}
                      onValueChange={setPaymentMethod}
                      className="grid grid-cols-1 md:grid-cols-3 gap-4"
                    >
                      {[
                        {
                          value: "credit-card",
                          label: "Credit Card",
                          icon: (
                            <CreditCard className="mb-3 h-6 w-6 text-primary" />
                          ),
                        },
                        {
                          value: "paypal",
                          label: "PayPal",
                          icon: (
                            <svg
                              className="mb-3 h-6 w-6 text-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <path d="M7 11V7a5 5 0 0 1 10 0v4" />
                              <rect
                                width="18"
                                height="12"
                                x="3"
                                y="11"
                                rx="2"
                              />
                            </svg>
                          ),
                        },
                        {
                          value: "bank",
                          label: "Bank Transfer",
                          icon: (
                            <svg
                              className="mb-3 h-6 w-6 text-primary"
                              xmlns="http://www.w3.org/2000/svg"
                              width="24"
                              height="24"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect width="20" height="14" x="2" y="5" rx="2" />
                              <line x1="2" x2="22" y1="10" y2="10" />
                            </svg>
                          ),
                        },
                      ].map((option) => (
                        <div key={option.value}>
                          <RadioGroupItem
                            value={option.value}
                            id={option.value}
                            className="peer sr-only"
                          />
                          <Label
                            htmlFor={option.value}
                            className="flex flex-col items-center justify-between rounded-md border-2 border-border bg-card p-4 hover:bg-muted hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted"
                          >
                            {option.icon}
                            <span className="text-foreground">
                              {option.label}
                            </span>
                          </Label>
                        </div>
                      ))}
                    </RadioGroup>

                    {paymentMethod === "credit-card" && (
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label htmlFor="name" className="text-foreground">
                            Name on Card
                          </Label>
                          <Input
                            id="name"
                            placeholder="John Doe"
                            className="border-border bg-card focus:ring-ring"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label
                            htmlFor="card-number"
                            className="text-foreground"
                          >
                            Card Number
                          </Label>
                          <Input
                            id="card-number"
                            placeholder="1234 5678 9012 3456"
                            className="border-border bg-card focus:ring-ring"
                          />
                        </div>
                        <div className="grid grid-cols-3 gap-4">
                          <div className="grid gap-2">
                            <Label
                              htmlFor="expiry-month"
                              className="text-foreground"
                            >
                              Expiry Month
                            </Label>
                            <Select>
                              <SelectTrigger
                                id="expiry-month"
                                className="border-border bg-card focus:ring-ring"
                              >
                                <SelectValue placeholder="Month" />
                              </SelectTrigger>
                              <SelectContent className="bg-popover border-border">
                                {Array.from({ length: 12 }, (_, i) => (
                                  <SelectItem
                                    key={i + 1}
                                    value={(i + 1).toString().padStart(2, "0")}
                                    className="text-foreground"
                                  >
                                    {(i + 1).toString().padStart(2, "0")}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label
                              htmlFor="expiry-year"
                              className="text-foreground"
                            >
                              Expiry Year
                            </Label>
                            <Select>
                              <SelectTrigger
                                id="expiry-year"
                                className="border-border bg-card focus:ring-ring"
                              >
                                <SelectValue placeholder="Year" />
                              </SelectTrigger>
                              <SelectContent className="bg-popover border-border">
                                {Array.from({ length: 10 }, (_, i) => (
                                  <SelectItem
                                    key={i}
                                    value={(
                                      new Date().getFullYear() + i
                                    ).toString()}
                                    className="text-foreground"
                                  >
                                    {new Date().getFullYear() + i}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                          <div className="grid gap-2">
                            <Label htmlFor="cvc" className="text-foreground">
                              CVC
                            </Label>
                            <Input
                              id="cvc"
                              placeholder="123"
                              className="border-border bg-card focus:ring-ring"
                            />
                          </div>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "paypal" && (
                      <div className="space-y-4">
                        <div className="rounded-md bg-muted p-4 border border-border">
                          <p className="text-foreground">
                            You will be redirected to PayPal to complete your
                            payment securely.
                          </p>
                        </div>
                      </div>
                    )}

                    {paymentMethod === "bank" && (
                      <div className="space-y-4">
                        <div className="grid gap-2">
                          <Label
                            htmlFor="account-name"
                            className="text-foreground"
                          >
                            Account Holder Name
                          </Label>
                          <Input
                            id="account-name"
                            placeholder="John Doe"
                            className="border-border bg-card focus:ring-ring"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label
                            htmlFor="account-number"
                            className="text-foreground"
                          >
                            Account Number
                          </Label>
                          <Input
                            id="account-number"
                            placeholder="000000000"
                            className="border-border bg-card focus:ring-ring"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label
                            htmlFor="routing-number"
                            className="text-foreground"
                          >
                            Routing Number
                          </Label>
                          <Input
                            id="routing-number"
                            placeholder="000000000"
                            className="border-border bg-card focus:ring-ring"
                          />
                        </div>
                      </div>
                    )}
                  </CardContent>
                  <CardFooter>
                    <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary">
                      Save Payment Method
                    </Button>
                  </CardFooter>
                </Card>
              </TabsContent>
              <TabsContent value="history" className="mt-4">
                <Card className="bg-card border-border shadow-primary">
                  <CardHeader>
                    <CardTitle className="text-foreground-bold">
                      Payment History
                    </CardTitle>
                    <CardDescription className="text-muted-foreground">
                      View your recent payment history
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      {[
                        {
                          id: "INV-001",
                          date: "Apr 15, 2023",
                          amount: "$19.99",
                          status: "Paid",
                        },
                        {
                          id: "INV-002",
                          date: "Mar 15, 2023",
                          amount: "$19.99",
                          status: "Paid",
                        },
                        {
                          id: "INV-003",
                          date: "Feb 15, 2023",
                          amount: "$19.99",
                          status: "Paid",
                        },
                      ].map((invoice) => (
                        <div
                          key={invoice.id}
                          className="flex items-center justify-between p-4 rounded-md border border-border bg-card"
                        >
                          <div>
                            <p className="font-medium text-foreground-bold">
                              {invoice.id}
                            </p>
                            <p className="text-sm text-muted-foreground">
                              {invoice.date}
                            </p>
                          </div>
                          <div className="text-right">
                            <p className="font-medium text-foreground-bold">
                              {invoice.amount}
                            </p>
                            <div className="flex items-center text-sm text-primary">
                              <CheckCircle className="mr-1 h-3 w-3" />
                              {invoice.status}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </CardContent>
                </Card>
              </TabsContent>
            </Tabs>
          </div>

          <div>
            <Card className="bg-card border-border shadow-primary">
              <CardHeader>
                <CardTitle className="text-foreground-bold">
                  Subscription Plan
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  Manage your subscription plan
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex items-center justify-center space-x-2">
                  <Button
                    variant={plan === "monthly" ? "default" : "outline"}
                    className={
                      plan === "monthly"
                        ? "bg-primary text-primary-foreground hover:bg-primary shadow-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }
                    onClick={() => setPlan("monthly")}
                  >
                    Monthly
                  </Button>
                  <Button
                    variant={plan === "yearly" ? "default" : "outline"}
                    className={
                      plan === "yearly"
                        ? "bg-primary text-primary-foreground hover:bg-primary shadow-primary"
                        : "border-border text-foreground hover:bg-muted"
                    }
                    onClick={() => setPlan("yearly")}
                  >
                    Yearly
                  </Button>
                </div>

                <RadioGroup defaultValue="pro" className="grid gap-4">
                  {[
                    {
                      id: "basic",
                      title: "Basic",
                      description: "Essential features for individuals",
                    },
                    {
                      id: "pro",
                      title: "Pro",
                      description: "Advanced features for professionals",
                    },
                    {
                      id: "enterprise",
                      title: "Enterprise",
                      description: "Complete solution for teams",
                    },
                  ].map((tier) => (
                    <div key={tier.id}>
                      <RadioGroupItem
                        value={tier.id}
                        id={tier.id}
                        className="peer sr-only"
                      />
                      <Label
                        htmlFor={tier.id}
                        className="flex justify-between rounded-md border-2 border-border bg-card p-4 hover:bg-muted hover:border-primary peer-data-[state=checked]:border-primary peer-data-[state=checked]:bg-muted"
                      >
                        <div>
                          <p className="font-medium text-foreground-bold">
                            {tier.title}
                          </p>
                          <p className="text-sm text-muted-foreground">
                            {tier.description}
                          </p>
                        </div>
                        <p className="font-bold text-foreground-bold">
                          {plans[plan][tier.id.toLowerCase()]}
                        </p>
                      </Label>
                    </div>
                  ))}
                </RadioGroup>

                <div className="rounded-md bg-muted p-4 border border-border flex items-start space-x-2">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm font-medium text-foreground">
                      Next billing date
                    </p>
                    <p className="text-sm text-muted-foreground">
                      May 15, 2023
                    </p>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button className="w-full bg-primary text-primary-foreground hover:bg-primary/90 shadow-primary">
                  Update Subscription
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>

        <div className="mt-8 text-center flex items-center justify-center text-sm text-muted-foreground">
          <Lock className="h-4 w-4 mr-1" />
          Your payment information is secure and encrypted
        </div>
      </div>
    </div>
  );
}
