export const flexBox = (
  align: string | undefined = undefined,
  justify: string | undefined = undefined
) => {
  return `
  display: flex;
  ${align ? `align-items: ${align};` : ""}
  ${justify ? `justify-content: ${justify};` : ""}
  `;
};

export const dimensions = (
  width: string | undefined = undefined,
  height: string | undefined = undefined
) => {
  return `
  ${width ? `width: ${width};` : ""}
  ${height ? `height: ${height};` : ""}
  `;
};
