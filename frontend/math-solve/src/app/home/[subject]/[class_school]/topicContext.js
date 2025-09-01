"use client";
import { createContext, useContext } from "react";

export const TopicContext = createContext();

export function useTopic() {
  return useContext(TopicContext);
}
