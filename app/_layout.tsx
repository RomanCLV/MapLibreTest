// app/_layout.tsx
import React from "react";
import { Slot } from "expo-router";
import { StatusBar } from "expo-status-bar";
import { ThemeProvider } from "@context/ThemeContext";
import { LanguageProvider } from "@context/LanguageContext";
import { useTheme } from "@hooks/useTheme";

const RootLayoutContent = () => {
  const theme = useTheme();
  return (
    <>
      <StatusBar style={theme.isDark ? "light" : "dark"} />
      <Slot />
    </>
  );
};

export default function RootLayout() {
  return (
    <ThemeProvider>
      <LanguageProvider>
        <RootLayoutContent />
      </LanguageProvider>
    </ThemeProvider>
  );
}
