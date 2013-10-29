{Template {
  $classpath : "app.templates.home.HomeLayout",
  $hasScript: true
}}
{macro main()}
<button {on click {fn: getDetails} /} > Get Details</button>
{/macro}
{/Template}