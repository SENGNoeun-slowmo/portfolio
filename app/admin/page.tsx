"use client";

import { useStats } from "@/hooks/useStats";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { 
  Package, 
  Users, 
  Trophy, 
  TrendingUp, 
  ArrowUpRight, 
  ArrowDownRight,
  Loader2,
  Mail
} from "lucide-react";
import { Badge } from "@/components/ui/badge";
import { Skeleton } from "@/components/ui/skeleton";

export default function AdminDashboardPage() {
  const { data: stats, isLoading, isError } = useStats();

  if (isError) {
    return (
      <div className="flex h-[400px] items-center justify-center rounded-xl border border-dashed text-destructive">
        Failed to load statistics. Please check your backend connection.
      </div>
    );
  }

  const statCards = [
    {
      title: "Total Projects",
      value: stats?.totalProducts || 0,
      icon: Package,
      description: "+2 from last month",
      trend: "up",
    },
    {
      title: "Active Users",
      value: stats?.totalUsers || 0,
      icon: Users,
      description: "+15% increase",
      trend: "up",
    },
    {
      title: "Messages",
      value: stats?.totalMessages || 0,
      icon: Mail,
      description: `${stats?.unreadMessages || 0} unread transmissions`,
      trend: stats?.unreadMessages > 0 ? "up" : "neutral",
    },
    {
      title: "Estimated Revenue",
      value: `$${(stats?.revenue || 0).toLocaleString()}`,
      icon: TrendingUp,
      description: "+12.5% from last year",
      trend: "up",
    },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h2 className="text-3xl font-bold tracking-tight">Welcome back, Admin</h2>
        <p className="text-muted-foreground">
          Here is what is happening with your portfolio today.
        </p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        {isLoading ? (
          Array.from({ length: 4 }).map((_, i) => (
            <Card key={i}>
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <Skeleton className="h-4 w-24" />
                <Skeleton className="h-4 w-4 rounded-full" />
              </CardHeader>
              <CardContent>
                <Skeleton className="h-8 w-16 mb-2" />
                <Skeleton className="h-3 w-32" />
              </CardContent>
            </Card>
          ))
        ) : (
          statCards.map((stat) => (
            <Card key={stat.title} className="hover:shadow-md transition-all">
              <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                <CardTitle className="text-sm font-medium">
                  {stat.title}
                </CardTitle>
                <stat.icon className="h-4 w-4 text-muted-foreground" />
              </CardHeader>
              <CardContent>
                <div className="text-2xl font-bold">{stat.value}</div>
                <p className="text-xs text-muted-foreground flex items-center gap-1 mt-1">
                  {stat.trend === "up" && <ArrowUpRight className="h-3 w-3 text-emerald-500" />}
                  {stat.trend === "down" && <ArrowDownRight className="h-3 w-3 text-rose-500" />}
                  {stat.description}
                </p>
              </CardContent>
            </Card>
          ))
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4 transition-all hover:border-primary/20">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            {isLoading ? (
              <div className="space-y-4">
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
                <Skeleton className="h-12 w-full" />
              </div>
            ) : (
              <div className="space-y-8">
                {stats?.recentActivity?.map((activity: any) => (
                  <div key={activity.id} className="flex items-center gap-4">
                    <div className="flex h-9 w-9 items-center justify-center rounded-full border bg-muted">
                      {activity.type === 'project_added' ? <Package className="h-4 w-4" /> : 
                       activity.type === 'message_received' ? <Mail className="h-4 w-4 text-neon-cyan" /> :
                       <Users className="h-4 w-4" />}
                    </div>
                    <div className="space-y-1">
                      <p className="text-sm font-medium leading-none">
                        {activity.message}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {new Date(activity.date).toLocaleDateString()}
                      </p>
                    </div>
                    <Badge variant="outline" className="ml-auto">
                      {activity.type.replace('_', ' ')}
                    </Badge>
                  </div>
                ))}
              </div>
            )}
          </CardContent>
        </Card>
        
        <Card className="col-span-3 h-full">
           <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
              <button className="w-full flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                <span>Add New Project</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                <span>Manage Users</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
              <button className="w-full flex items-center justify-between p-4 rounded-lg border hover:bg-accent transition-colors">
                <span>Site Settings</span>
                <ArrowUpRight className="h-4 w-4" />
              </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
