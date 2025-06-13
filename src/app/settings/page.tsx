"use client"

import { useState } from "react"
import { useAuth } from "@/components/auth-provider"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Separator } from "@/components/ui/separator"
import { useToast } from "@/hooks/use-toast"
import { useTheme } from "next-themes"
import { Bell, Globe, CreditCard, Shield, Download, Trash2, Moon, Sun, Monitor } from "lucide-react"

export default function SettingsPage() {
  const { user } = useAuth()
  const { theme, setTheme } = useTheme()
  const { toast } = useToast()

  const [settings, setSettings] = useState({
    notifications: {
      bookingUpdates: true,
      promotions: false,
      newsletter: true,
      reminders: true,
    },
    privacy: {
      profileVisibility: "public",
      showTravelHistory: false,
      allowRecommendations: true,
    },
    language: "en",
    currency: "USD",
    timezone: "UTC",
  })

  const handleNotificationChange = (key: string, value: boolean) => {
    setSettings((prev) => ({
      ...prev,
      notifications: {
        ...prev.notifications,
        [key]: value,
      },
    }))
  }

  const handlePrivacyChange = (key: string, value: any) => {
    setSettings((prev) => ({
      ...prev,
      privacy: {
        ...prev.privacy,
        [key]: value,
      },
    }))
  }

  const saveSettings = () => {
    // In a real app, this would save to Firebase
    toast({
      title: "Settings saved",
      description: "Your settings have been successfully updated.",
    })
  }

  const exportData = () => {
    // In a real app, this would export user data
    toast({
      title: "Data export requested",
      description: "Your data export will be sent to your email within 24 hours.",
    })
  }

  const deleteAccount = () => {
    // In a real app, this would show a confirmation dialog
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account.",
      variant: "destructive",
    })
  }

  if (!user) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Card className="text-center">
          <CardContent className="pt-6">
            <h2 className="text-2xl font-bold mb-4">Please Sign In</h2>
            <p className="text-muted-foreground mb-4">You need to be signed in to access settings.</p>
            <Button asChild>
              <a href="/auth/login">Sign In</a>
            </Button>
          </CardContent>
        </Card>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-4xl">
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-4">Settings</h1>
        <p className="text-muted-foreground">Manage your account preferences and privacy settings</p>
      </div>

      <div className="space-y-6">
        {/* Appearance */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Monitor className="h-5 w-5 mr-2" />
              Appearance
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Theme</Label>
                <p className="text-sm text-muted-foreground">Choose your preferred theme</p>
              </div>
              <Select value={theme} onValueChange={setTheme}>
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="light">
                    <div className="flex items-center">
                      <Sun className="h-4 w-4 mr-2" />
                      Light
                    </div>
                  </SelectItem>
                  <SelectItem value="dark">
                    <div className="flex items-center">
                      <Moon className="h-4 w-4 mr-2" />
                      Dark
                    </div>
                  </SelectItem>
                  <SelectItem value="system">
                    <div className="flex items-center">
                      <Monitor className="h-4 w-4 mr-2" />
                      System
                    </div>
                  </SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>

        {/* Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Bell className="h-5 w-5 mr-2" />
              Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Booking Updates</Label>
                <p className="text-sm text-muted-foreground">Get notified about booking confirmations and changes</p>
              </div>
              <Switch
                checked={settings.notifications.bookingUpdates}
                onCheckedChange={(checked) => handleNotificationChange("bookingUpdates", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Promotions & Deals</Label>
                <p className="text-sm text-muted-foreground">Receive notifications about special offers</p>
              </div>
              <Switch
                checked={settings.notifications.promotions}
                onCheckedChange={(checked) => handleNotificationChange("promotions", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Newsletter</Label>
                <p className="text-sm text-muted-foreground">Weekly travel inspiration and tips</p>
              </div>
              <Switch
                checked={settings.notifications.newsletter}
                onCheckedChange={(checked) => handleNotificationChange("newsletter", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Travel Reminders</Label>
                <p className="text-sm text-muted-foreground">Reminders about upcoming trips</p>
              </div>
              <Switch
                checked={settings.notifications.reminders}
                onCheckedChange={(checked) => handleNotificationChange("reminders", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Language & Region */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Globe className="h-5 w-5 mr-2" />
              Language & Region
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <Label className="text-base">Language</Label>
                <Select
                  value={settings.language}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, language: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="en">English</SelectItem>
                    <SelectItem value="id">Bahasa Indonesia</SelectItem>
                    <SelectItem value="ja">日本語</SelectItem>
                    <SelectItem value="fr">Français</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base">Currency</Label>
                <Select
                  value={settings.currency}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, currency: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="USD">USD - US Dollar</SelectItem>
                    <SelectItem value="EUR">EUR - Euro</SelectItem>
                    <SelectItem value="IDR">IDR - Indonesian Rupiah</SelectItem>
                    <SelectItem value="JPY">JPY - Japanese Yen</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div>
                <Label className="text-base">Timezone</Label>
                <Select
                  value={settings.timezone}
                  onValueChange={(value) => setSettings((prev) => ({ ...prev, timezone: value }))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="UTC">UTC</SelectItem>
                    <SelectItem value="America/New_York">Eastern Time</SelectItem>
                    <SelectItem value="America/Los_Angeles">Pacific Time</SelectItem>
                    <SelectItem value="Europe/London">London</SelectItem>
                    <SelectItem value="Asia/Tokyo">Tokyo</SelectItem>
                    <SelectItem value="Asia/Jakarta">Jakarta</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Privacy */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <Shield className="h-5 w-5 mr-2" />
              Privacy & Security
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Profile Visibility</Label>
                <p className="text-sm text-muted-foreground">Control who can see your profile</p>
              </div>
              <Select
                value={settings.privacy.profileVisibility}
                onValueChange={(value) => handlePrivacyChange("profileVisibility", value)}
              >
                <SelectTrigger className="w-32">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="public">Public</SelectItem>
                  <SelectItem value="friends">Friends</SelectItem>
                  <SelectItem value="private">Private</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Show Travel History</Label>
                <p className="text-sm text-muted-foreground">Allow others to see your past trips</p>
              </div>
              <Switch
                checked={settings.privacy.showTravelHistory}
                onCheckedChange={(checked) => handlePrivacyChange("showTravelHistory", checked)}
              />
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">AI Recommendations</Label>
                <p className="text-sm text-muted-foreground">Use my data to provide personalized recommendations</p>
              </div>
              <Switch
                checked={settings.privacy.allowRecommendations}
                onCheckedChange={(checked) => handlePrivacyChange("allowRecommendations", checked)}
              />
            </div>
          </CardContent>
        </Card>

        {/* Data & Account */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center">
              <CreditCard className="h-5 w-5 mr-2" />
              Data & Account
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base">Export Data</Label>
                <p className="text-sm text-muted-foreground">Download a copy of your data</p>
              </div>
              <Button variant="outline" onClick={exportData}>
                <Download className="h-4 w-4 mr-2" />
                Export
              </Button>
            </div>

            <Separator />

            <div className="flex items-center justify-between">
              <div>
                <Label className="text-base text-red-600">Delete Account</Label>
                <p className="text-sm text-muted-foreground">Permanently delete your account and all data</p>
              </div>
              <Button variant="destructive" onClick={deleteAccount}>
                <Trash2 className="h-4 w-4 mr-2" />
                Delete
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Save Button */}
        <div className="flex justify-end">
          <Button onClick={saveSettings} size="lg">
            Save All Settings
          </Button>
        </div>
      </div>
    </div>
  )
}
