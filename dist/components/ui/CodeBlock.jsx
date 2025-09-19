import { useState } from "react";
export default function CodeBlock({ language, value }) {
    const [copied, setCopied] = useState(false);
    const handleCopy = () => {
        navigator.clipboard.writeText(value);
        setCopied(true);
        setTimeout(() => setCopied(false), 2000);
    };
    return (<div className="relative">
      <pre>
        <code className={language ? `language-${language}` : ""}>{value}</code>
        <button onClick={handleCopy} className="code-copy-button" aria-label="复制代码">
          {copied ? "已复制！" : "复制"}
        </button>
      </pre>
    </div>);
}
//# sourceMappingURL=CodeBlock.jsx.map