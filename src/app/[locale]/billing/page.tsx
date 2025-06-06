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
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Calendar, Lock } from "lucide-react";
import Container from "@/components/layouts/container";

export default function BillingPage() {
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
    <Container>
      <div className="w-full flex flex-col justify-center items-center p-4 sm:p-6">
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-foreground-bold">
            Billing & Subscription
          </h1>
          <p className="text-muted-foreground">
            Manage your subscription and payment methods
          </p>
        </div>

        <div className="w-full max-w-2xl p-4 sm:p-6">
          <Card className="w-full bg-card border-border shadow-primary">
            <CardHeader>
              <CardTitle className="text-foreground-bold">
                Subscription Plan
              </CardTitle>
              <CardDescription className="text-muted-foreground">
                Manage your subscription plan
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-start space-x-2">
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
                  <p className="text-sm text-muted-foreground">May 15, 2023</p>
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

        <div className="mt-8 text-center flex items-center justify-center text-sm text-muted-foreground">
          <Lock className="h-4 w-4 mr-1" />
          Your payment information is secure and encrypted
        </div>
      </div>
    </Container>
  );
}
