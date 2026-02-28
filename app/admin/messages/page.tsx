"use client";

import React from "react";
import { 
  useMessages, 
  useUpdateMessageStatus, 
  useDeleteMessage 
} from "@/hooks/useMessages";
import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow 
} from "@/components/ui/table";
import { 
  Card, 
  CardContent, 
  CardDescription, 
  CardHeader, 
  CardTitle 
} from "@/components/ui/card";
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuLabel, 
  DropdownMenuSeparator, 
  DropdownMenuTrigger 
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { 
  MoreHorizontal, 
  Mail, 
  Trash2, 
  CheckCircle2, 
  Clock, 
  Archive,
  RefreshCcw
} from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import { Badge } from "@/components/ui/badge";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagesPage() {
  const { data: messages, isLoading, refetch } = useMessages();
  const { mutate: updateStatus } = useUpdateMessageStatus();
  const { mutate: deleteMsg } = useDeleteMessage();

  const getStatusBadge = (status: string) => {
    switch (status) {
      case "unread":
        return <Badge className="bg-neon-cyan/20 text-neon-cyan border-neon-cyan/30">Unread</Badge>;
      case "read":
        return <Badge variant="outline" className="text-white/40 border-white/10">Read</Badge>;
      case "archived":
        return <Badge className="bg-neon-purple/20 text-neon-purple border-neon-purple/30">Archived</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const handleStatusUpdate = (id: string, status: any) => {
    updateStatus({ id, status }, {
      onSuccess: () => toast.success(`Message marked as ${status}`),
    });
  };

  const handleDelete = (id: string) => {
    if (window.confirm("Are you sure you want to delete this transmission permanently?")) {
      deleteMsg(id, {
        onSuccess: () => toast.success("Transmission purged."),
      });
    }
  };

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[400px]">
        <RefreshCcw className="h-8 w-8 animate-spin text-neon-cyan" />
      </div>
    );
  }

  const messageList = Array.isArray(messages) ? messages : [];

  return (
    <div className="space-y-8 animate-in fade-in duration-500">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-4xl font-black italic tracking-tighter uppercase text-white">
            Incoming <span className="text-neon-cyan">Transmissions</span>
          </h1>
          <p className="text-white/40 text-sm mt-1 uppercase tracking-widest">Monitor secure communications</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => refetch()} 
          className="border-white/10 hover:bg-white/5"
        >
          <RefreshCcw className="h-4 w-4 mr-2" />
          Refresh
        </Button>
      </div>

      <Card className="bg-black/40 border-white/10 backdrop-blur-xl">
        <CardHeader>
          <CardTitle className="text-white uppercase tracking-tighter">Transmission Log</CardTitle>
          <CardDescription className="text-white/40">Sorted by most recent intercept</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="rounded-xl border border-white/5 overflow-hidden">
            <Table>
              <TableHeader className="bg-white/5">
                <TableRow className="border-white/5 hover:bg-transparent">
                  <TableHead className="text-white font-bold uppercase tracking-tight">Status</TableHead>
                  <TableHead className="text-white font-bold uppercase tracking-tight">Identity</TableHead>
                  <TableHead className="text-white font-bold uppercase tracking-tight w-[40%]">Message Payload</TableHead>
                  <TableHead className="text-white font-bold uppercase tracking-tight">Time</TableHead>
                  <TableHead className="text-right text-white font-bold uppercase tracking-tight">Action</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {messageList.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="h-64 text-center">
                      <div className="flex flex-col items-center justify-center text-white/20">
                        <Mail className="h-12 w-12 mb-4 opacity-20" />
                        <p className="font-bold uppercase tracking-widest">No transmissions detected</p>
                      </div>
                    </TableCell>
                  </TableRow>
                ) : (
                  messageList.map((msg: any) => (
                    <TableRow key={msg.id} className="border-white/5 hover:bg-white/5 group transition-colors">
                      <TableCell>{getStatusBadge(msg.status)}</TableCell>
                      <TableCell>
                        <div className="flex flex-col">
                          <span className="font-bold text-white">{msg.name}</span>
                          <span className="text-xs text-white/40">{msg.email}</span>
                        </div>
                      </TableCell>
                      <TableCell className="max-w-md">
                        <p className="text-sm text-white/70 line-clamp-2 italic group-hover:line-clamp-none transition-all duration-300">
                          "{msg.message}"
                        </p>
                      </TableCell>
                      <TableCell className="text-white/40 text-xs">
                        {format(new Date(msg.created_at), "MMM d, HH:mm")}
                      </TableCell>
                      <TableCell className="text-right">
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className="h-8 w-8 p-0 hover:bg-white/10 text-white">
                              <MoreHorizontal className="h-4 w-4" />
                            </Button>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent align="end" className="bg-slate-900 border-white/10 text-white">
                            <DropdownMenuLabel>Transmission Control</DropdownMenuLabel>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(msg.id, "read")}
                              className="focus:bg-white/10"
                            >
                              <CheckCircle2 className="h-4 w-4 mr-2" /> Mark Read
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(msg.id, "unread")}
                              className="focus:bg-white/10"
                            >
                              <Clock className="h-4 w-4 mr-2" /> Mark Unread
                            </DropdownMenuItem>
                            <DropdownMenuItem 
                              onClick={() => handleStatusUpdate(msg.id, "archived")}
                              className="focus:bg-white/10"
                            >
                              <Archive className="h-4 w-4 mr-2" /> Archive
                            </DropdownMenuItem>
                            <DropdownMenuSeparator className="bg-white/5" />
                            <DropdownMenuItem 
                              onClick={() => handleDelete(msg.id)}
                              className="text-rose-500 focus:bg-rose-500/10 focus:text-rose-500"
                            >
                              <Trash2 className="h-4 w-4 mr-2" /> Purge
                            </DropdownMenuItem>
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
