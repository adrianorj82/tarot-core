"use client";

type ViewType =
  | "new"
  | "history"
  | "favorites"
  | "archived"
  | "profiles"
  | "journal"
  | "settings";

type Props = {
  isOpen: boolean;

  onClose: () => void;

  currentView: ViewType;

  setCurrentView: (
    view: ViewType
  ) => void;
};

export default function Menu({
  isOpen,
  onClose,
  currentView,
  setCurrentView,
}: Props) {
  const items = [
    {
      id: "new",
      label: "Nova Tiragem",
    },

    {
      id: "history",
      label: "Histórico",
    },

    {
      id: "profiles",
      label: "Perfis",
    },

    {
      id: "favorites",
      label: "Favoritas",
    },

    {
      id: "archived",
      label: "Arquivadas",
    },

    {
      id: "journal",
      label: "Diário",
    },

    {
      id: "settings",
      label: "Configurações",
    },
  ];

  return (
    <>
      {/* OVERLAY */}
      {isOpen && (
        <div
          onClick={onClose}
          style={{
            position: "fixed",

            inset: 0,

            background:
              "rgba(0,0,0,0.6)",

            backdropFilter:
              "blur(3px)",

            zIndex: 20,
          }}
        />
      )}

      {/* MENU */}
      <div
        style={{
          position: "fixed",

          top: 0,

          left: isOpen
            ? 0
            : "-340px",

          width: "320px",

          height: "100vh",

          background:
            "rgba(10,10,10,0.96)",

          borderRight:
            "1px solid rgba(212,175,55,0.15)",

          padding: "30px",

          transition:
            "left 0.35s ease",

          zIndex: 30,

          boxShadow:
            "0 0 30px rgba(0,0,0,0.6)",
        }}
      >
        {/* HEADER */}
        <div
          style={{
            display: "flex",

            justifyContent:
              "space-between",

            alignItems: "center",

            marginBottom: "40px",
          }}
        >
          <div
            style={{
              color: "#d4af37",

              fontSize: "22px",

              letterSpacing:
                "1px",
            }}
          >
            ✶ ORÁCULO
          </div>

          <button
            onClick={onClose}
            style={{
              background: "none",

              border: "none",

              color:
                "rgba(255,255,255,0.7)",

              fontSize: "24px",

              cursor: "pointer",
            }}
          >
            ✕
          </button>
        </div>

        {/* ITEMS */}
        <div
          style={{
            display: "flex",

            flexDirection: "column",

            gap: "18px",
          }}
        >
          {items.map((item) => {
            const active =
              currentView === item.id;

            return (
              <button
                key={item.id}
                onClick={() => {
                  setCurrentView(
                    item.id as ViewType
                  );

                  onClose();
                }}
                style={{
                  width: "100%",

                  background: active
                    ? "rgba(212,175,55,0.15)"
                    : "rgba(255,255,255,0.03)",

                  border: active
                    ? "1px solid rgba(212,175,55,0.25)"
                    : "1px solid rgba(255,255,255,0.05)",

                  borderRadius: "14px",

                  padding:
                    "16px 18px",

                  color: active
                    ? "#f5e6b8"
                    : "rgba(255,255,255,0.88)",

                  fontSize: "16px",

                  textAlign: "left",

                  cursor: "pointer",

                  transition:
                    "all 0.2s ease",
                }}
              >
                {item.label}
              </button>
            );
          })}
        </div>
      </div>
    </>
  );
}