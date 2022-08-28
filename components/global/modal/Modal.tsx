import { UniversalPortal } from "@jesstelford/react-portal-universal";

export default function Modal(props: any) {
  return (
    <>
      {props.isOpen && (
        <UniversalPortal selector="#modal">
          <div className="fixed top-0 bottom-0 right-0 left-0 z-[1000] flex items-center justify-center bg-zinc-900 bg-opacity-90">
            <div className="h-96 w-96 rounded-xl bg-zinc-600 shadow-lg">
              <h1>Modal</h1>
              <button onClick={() => props.handleClose()}>Close</button>
            </div>
          </div>
        </UniversalPortal>
      )}
    </>
  );
}
