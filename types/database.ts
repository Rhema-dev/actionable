export type LeadStatus =
  | "New"
  | "Contacted"
  | "Engaged"
  | "Proposal Sent"
  | "Negotiating"
  | "Closed Won"
  | "Closed Lost";

export type LeadResponse =
  | "No Reply"
  | "Interested"
  | "Not Interested"
  | "Meeting Booked"
  | "Converted";

export type ProjectStatus =
  | "Scoping"
  | "In Progress"
  | "Client Review"
  | "Revisions"
  | "Completed"
  | "Cancelled";

export type ProjectType =
  | "Launch Video"
  | "Explainer"
  | "Onboarding Series"
  | "VSL"
  | "Demo"
  | "Custom";

export type ContentPlatform = "X" | "YouTube" | "LinkedIn";
export type ContentStatus = "Draft" | "Scheduled" | "Published" | "Skipped";
export type ContentType =
  | "Showcase"
  | "Value/Tips"
  | "Behind-Scenes"
  | "Poll"
  | "Question"
  | "Repurposed"
  | "Short"
  | "Long Video";

export type GoalPeriod = "Daily" | "Weekly" | "Monthly" | "Quarterly" | "Custom";
export type GoalStatus = "Active" | "Completed" | "Failed" | "Paused";
export type GoalType =
  | "Revenue"
  | "Leads"
  | "Posts"
  | "Projects"
  | "DMs Sent"
  | "Replies"
  | "Custom";

export type DMTemplateType =
  | "Initial Outreach"
  | "Mockup Offer"
  | "Value-First"
  | "Follow-Up"
  | "Meeting Request"
  | "SaaS Pitch"
  | "Tweet Library"
  | "LinkedIn Post";

export interface Profile {
  id: string;
  full_name: string | null;
  business_name: string | null;
  x_handle: string | null;
  youtube_channel: string | null;
  hourly_rate: number | null;
  monthly_revenue_goal: number | null;
  pc_goal_target: number | null;
  created_at: string;
  updated_at: string;
}

export interface Lead {
  id: string;
  user_id: string;
  date_found: string;
  x_handle: string;
  company: string | null;
  follower_count: number | null;
  source: string;
  engaged: boolean;
  dm_sent: boolean;
  dm_sent_date: string | null;
  response: LeadResponse;
  next_step: string | null;
  status: LeadStatus;
  estimated_value: number | null;
  mockup_sent: boolean;
  follow_up_date: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Project {
  id: string;
  user_id: string;
  lead_id: string | null;
  client_name: string;
  client_x_handle: string | null;
  project_type: ProjectType;
  price: number;
  deposit_amount: number;
  deposit_paid: boolean;
  deposit_paid_date: string | null;
  final_paid: boolean;
  final_paid_date: string | null;
  status: ProjectStatus;
  start_date: string | null;
  deadline: string | null;
  completed_date: string | null;
  video_length_seconds: number | null;
  revision_count: number;
  max_revisions: number;
  deliverables: string | null;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface Income {
  id: string;
  user_id: string;
  project_id: string | null;
  amount: number;
  date: string;
  payment_type: string;
  description: string | null;
  created_at: string;
  projects?: { client_name: string } | null;
}

export interface Expense {
  id: string;
  user_id: string;
  amount: number;
  category: string;
  description: string;
  date: string;
  is_pc_fund_contribution: boolean;
  recurring: boolean;
  created_at: string;
}

export interface SavingsGoal {
  id: string;
  user_id: string;
  goal_name: string;
  description: string | null;
  target_amount: number;
  current_amount: number;
  deadline: string | null;
  status: string;
  created_at: string;
  updated_at: string;
}

export interface Goal {
  id: string;
  user_id: string;
  title: string;
  description: string | null;
  goal_type: GoalType;
  target_value: number;
  current_value: number;
  period: GoalPeriod;
  start_date: string;
  end_date: string | null;
  status: GoalStatus;
  created_at: string;
  updated_at: string;
}

export interface ContentPost {
  id: string;
  user_id: string;
  platform: ContentPlatform;
  content_type: ContentType;
  title: string | null;
  hook: string | null;
  content: string | null;
  call_to_action: string | null;
  scheduled_date: string | null;
  scheduled_time: string | null;
  status: ContentStatus;
  published_at: string | null;
  likes: number;
  replies: number;
  reposts: number;
  bookmarks: number;
  impressions: number;
  profile_visits: number;
  views: number;
  notes: string | null;
  created_at: string;
  updated_at: string;
}

export interface DailyChecklist {
  id: string;
  user_id: string;
  date: string;
  task_key: string;
  task_label: string;
  target_count: number;
  completed_count: number;
  is_done: boolean;
  completed_at: string | null;
  notes: string | null;
  created_at: string;
}

export interface DMTemplate {
  id: string;
  user_id: string;
  name: string;
  template_type: DMTemplateType;
  content: string;
  use_case: string | null;
  times_used: number;
  is_favorite: boolean;
  created_at: string;
  updated_at: string;
}

export interface FollowUp {
  id: string;
  user_id: string;
  lead_id: string;
  due_date: string;
  message_template: string | null;
  is_completed: boolean;
  completed_at: string | null;
  outcome: string | null;
  created_at: string;
  leads?: { x_handle: string; company: string | null };
}
