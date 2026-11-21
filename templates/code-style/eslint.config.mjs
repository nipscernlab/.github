// Reference ESLint configuration of nipscernlab, GUIDELINES.md section 6.
// Layout is left to Prettier; ESLint checks correctness only.
import js from '@eslint/js';

export default [
    js.configs.recommended,
    {
        linterOptions: {
            reportUnusedDisableDirectives: 'error',
        },
    },
];
