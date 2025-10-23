// src/mocks/nextImageMock.js
// Mock Next.js Image pour Jest
exports.__esModule = true;
exports.default = function NextImageMock(props) {
  // renvoie une <img> standard pour les tests
  // eslint-disable-next-line react/react-in-jsx-scope
  return <img {...props} alt={props.alt || ""} />;
};
