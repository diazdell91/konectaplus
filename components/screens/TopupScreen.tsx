import React from "react";
import { TopupContactTab, TopupHistoryTab } from "../topup";
import { SegmentedTopTabsPager } from "../ui";

type TabKey = "contacts" | "history";

const tabs: { key: TabKey; title: string }[] = [
  { key: "contacts", title: "Contactos" },
  { key: "history", title: "Historial" },
];

export default function TopupScreen() {
  const [activeKey, setActiveKey] = React.useState<TabKey>("contacts");

  const index = React.useMemo(
    () =>
      Math.max(
        0,
        tabs.findIndex((t) => t.key === activeKey),
      ),
    [activeKey],
  );

  const onIndexChange = React.useCallback((nextIndex: number) => {
    const nextKey = tabs[nextIndex]?.key;
    if (nextKey) setActiveKey(nextKey);
  }, []);

  return (
    <SegmentedTopTabsPager
      tabs={tabs}
      index={index}
      onIndexChange={onIndexChange}
      renderPage={(key) => {
        if (key === "history") return <TopupHistoryTab />;
        if (key === "contacts") return <TopupContactTab />;
        return null;
      }}
    />
  );
}
