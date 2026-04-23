/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { ResumeProvider } from './context/ResumeContext';
import { BuilderLayout } from './components/BuilderLayout';

export default function App() {
  return (
    <ResumeProvider>
      <BuilderLayout />
    </ResumeProvider>
  );
}
