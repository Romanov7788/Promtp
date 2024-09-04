export function trimResponseContent(responseContent) {
  const trimmedContent = responseContent
    .trim()
    .replace(/```/g, "")
    .replace(/json\n/g, "")

  return trimmedContent;
}
