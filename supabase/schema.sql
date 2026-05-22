-- ============================================================
-- チームタスク管理 — Supabase スキーマ
-- Supabase の SQL Editor でこのファイルをまるごと実行してください
-- ============================================================

-- メンバーテーブル
create table if not exists members (
  id uuid default gen_random_uuid() primary key,
  name text not null,
  created_at timestamptz default now()
);

-- タスクテーブル
create table if not exists tasks (
  id uuid default gen_random_uuid() primary key,
  title text not null,
  description text,
  notes text,
  assignee_id uuid references members(id) on delete set null,
  requester_id uuid references members(id) on delete set null,
  due_date date,
  priority text check (priority in ('high', 'medium', 'low')) default 'medium',
  status text check (status in ('todo', 'in_progress', 'done')) default 'todo',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- updated_at を自動更新するトリガー
create or replace function update_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

create or replace trigger tasks_updated_at
  before update on tasks
  for each row execute function update_updated_at();

-- RLS（Row Level Security）を有効化し、認証なしで全操作を許可
alter table members enable row level security;
alter table tasks enable row level security;

drop policy if exists "members_all" on members;
drop policy if exists "tasks_all" on tasks;

create policy "members_all" on members for all using (true) with check (true);
create policy "tasks_all" on tasks for all using (true) with check (true);
