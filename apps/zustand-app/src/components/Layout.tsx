import React from 'react';
import Link from 'next/link';
import { useRenderCount } from '@shared/ui';
import { LiveTickerContainer } from './LiveTickerContainer';
import { CurrencyToggleContainer } from './CurrencyToggleContainer';
import { ThemeToggleContainer } from './ThemeToggleContainer';
import { CartLinkContainer } from './CartLinkContainer';

interface LayoutProps {
  children: React.ReactNode;
}

function LayoutComponent({ children }: LayoutProps) {
  const renderCount = useRenderCount('Layout');
  
  return (
    <>
      <header className="bg-white dark:bg-gray-800 shadow-sm">
        <div className="max-w-7xl mx-auto p-4">
          <div className="flex justify-between">
            <div>
              <h1>Zustand Store {renderCount && `(R:${renderCount})`}</h1>
              <nav>
                <Link href="/">Catalog</Link>
                <CartLinkContainer />
              </nav>
            </div>
            
            <div>
              <LiveTickerContainer />
              <CurrencyToggleContainer />
              <ThemeToggleContainer />
            </div>
          </div>
        </div>
      </header>
      <main>{children}</main>
    </>
  );
}

export const Layout = React.memo(LayoutComponent);
//             </div>
//           </div>
//         </div>
//       </header>
      
//       <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
//         {children}
//       </main>
//     </div>
//   );
// };
