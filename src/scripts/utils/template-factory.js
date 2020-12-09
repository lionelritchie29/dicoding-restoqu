const templateFactory = (html, scss) => {
  const template = document.createElement('template');
  template.innerHTML = `
    <style>
        ${scss}
    </style>
    ${html}`;

  return template;
};

export default templateFactory;
