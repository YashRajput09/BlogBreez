export const generateSearchQuery = (searchQuery) => {
  return {
    $or: [
      { title: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
      { category: { $regex: '.*' + searchQuery + '.*', $options: 'i' } },
    ]
  };
};