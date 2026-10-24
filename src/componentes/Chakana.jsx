/* Chakana: la cruz escalonada andina que usa Wayra como marca. Se dibuja con
   currentColor, así que toma el color del texto que la rodea. Es decorativa:
   el nombre accesible lo da el texto vecino. */
export default function Chakana({ className }) {
  return (
    <svg className={className} viewBox="0 0 12 12" aria-hidden="true" focusable="false">
      <path
        fill="currentColor"
        fillRule="evenodd"
        d="M4 0H8V2H10V4H12V8H10V10H8V12H4V10H2V8H0V4H2V2H4Z M5 5H7V7H5Z"
      />
    </svg>
  );
}
