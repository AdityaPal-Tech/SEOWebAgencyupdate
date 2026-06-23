"use client";

import React, { Suspense, lazy, Component, type ReactNode } from "react";

const Spline = lazy(() => import("@splinetool/react-spline/next"));

interface SplineSceneProps {
  sceneUrl?: string;
  className?: string;
}

interface ErrorBoundaryProps {
  children: ReactNode;
}

interface ErrorBoundaryState {
  hasError: boolean;
}

class SplineErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(): ErrorBoundaryState {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return null;
    }
    return this.props.children;
  }
}

export default function SplineScene({
  sceneUrl = "https://prod.spline.design/your-scene-url/scene.splinecode",
  className = "",
}: SplineSceneProps) {
  const [isLoaded, setIsLoaded] = React.useState(false);

  return (
    <div className={`absolute inset-0 w-full h-full ${className}`}>
      <SplineErrorBoundary>
        <Suspense
          fallback={
            <div className="w-full h-full flex items-center justify-center">
              <div className="w-12 h-12 border-2 border-primary/30 border-t-primary rounded-full animate-spin" />
            </div>
          }
        >
          <Spline
            scene={sceneUrl}
            onLoad={() => setIsLoaded(true)}
            className="w-full h-full"
            style={{ opacity: isLoaded ? 1 : 0, transition: "opacity 0.8s ease" }}
          />
        </Suspense>
      </SplineErrorBoundary>
    </div>
  );
}
