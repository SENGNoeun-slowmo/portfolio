"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { sendMessage, fetchMessages, updateMessageStatus, deleteMessage } from "@/lib/api";

export function useSendMessage() {
  return useMutation({
    mutationFn: sendMessage,
  });
}

export function useMessages() {
  return useQuery({
    queryKey: ["messages"],
    queryFn: fetchMessages,
  });
}

export function useUpdateMessageStatus() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ id, status }: { id: string; status: "unread" | "read" | "archived" }) => 
      updateMessageStatus(id, status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}

export function useDeleteMessage() {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteMessage,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["messages"] });
    },
  });
}
