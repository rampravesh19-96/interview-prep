export type RevisionTopic = {
  id: string;
  title: string;
  definition: string;
  example?: string;
};

export type RevisionCategory = {
  id: string;
  title: string;
  topics: RevisionTopic[];
};

export type RevisionCategorySeed = {
  title: string;
  topics: Array<{
    title: string;
    definition: string;
    example?: string;
  }>;
};

export function createCategories(seeds: RevisionCategorySeed[]): RevisionCategory[] {
  return seeds.map((category) => {
    const categoryId = toId(category.title);
    return {
      id: categoryId,
      title: category.title,
      topics: category.topics.map((topic) => ({
        ...topic,
        id: `${categoryId}-${toId(topic.title)}`,
      })),
    };
  });
}

function toId(value: string): string {
  return value.toLowerCase().replace(/&/g, "and").replace(/[^a-z0-9]+/g, "-").replace(/^-|-$/g, "");
}
