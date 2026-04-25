import fs from 'fs';
let code = fs.readFileSync('src/components/FormPane.tsx', 'utf8');

code = code.replace(/className="min-h-\[120px\]"[\s\S]*?<\/Accordion>[\s\S]*?\{!data\.settings\.hiddenSections\?\.includes\('experience'\)/, "className=\"min-h-[120px]\"\n            />\n         </Accordion>\n         )}\n\n         {!data.settings.hiddenSections?.includes('experience')");

fs.writeFileSync('src/components/FormPane.tsx', code);
