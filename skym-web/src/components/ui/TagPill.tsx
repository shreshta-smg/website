import { Tag } from "@/lib/types";

export const TagPill = ({ tag }: { tag: string }) => (
  <span className="badge badge-outline badge-info mx-1">{tag}</span>
);
