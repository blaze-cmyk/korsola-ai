insert into storage.buckets (id, name, public) values ('ms-videos', 'ms-videos', true) on conflict (id) do nothing;
create policy "ms-videos public read" on storage.objects for select using (bucket_id = 'ms-videos');
create policy "ms-videos service write" on storage.objects for insert to service_role with check (bucket_id = 'ms-videos');