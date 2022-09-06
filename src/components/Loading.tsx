import { LoadingOverlay } from '@mantine/core';

function Loading() {
  return (
    <div style={{ width: '100%', position: 'relative' }}>
      <LoadingOverlay visible={true} overlayBlur={2} />
    </div>
  );
}

export default Loading;
