export const submitContactForm = async () => {
  await new Promise((resolve) => setTimeout(resolve, 50));
  if (Math.random() < 0.05) {
    throw new Error('Network error');
  }
};
