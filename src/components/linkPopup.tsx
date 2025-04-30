"use client";
import React, { useState } from "react";
import { ExternalLink, Link, Unlink } from "lucide-react";

import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Card, CardContent, CardFooter } from "./ui/card";

export interface LinkPopupComponentProps {
  x: number;
  y: number;
  initialUrl: string;
  onSubmit: (url: string) => void;
  onRemove: () => void;
  isLinkActive: boolean;
}
export default function LinkPopupComponent({
  x,
  y,
  initialUrl,
  onSubmit,
  onRemove,
  isLinkActive,
}: LinkPopupComponentProps) {
  const [inputLink, setInputLink] = useState<string | null>(initialUrl || null);

  const onOpen = () => {
    if (inputLink != null) window.open(inputLink, "_blank");
  };

  return (
    <Card
      className="w-[350px] z-50 animate-in fade-in "
      style={{
        position: "absolute",
        top: `${y}px`,
        left: `${x}px`,
      }}
    >
      <CardContent>
        <Input
          id="link"
          placeholder="Digite o link"
          onChange={(e) => setInputLink(e.target.value)}
          value={inputLink ?? initialUrl}
        />
      </CardContent>
      <CardFooter>
        {!isLinkActive ? (
          <Button
            variant="outline"
            onClick={() => onSubmit(inputLink as string)}
          >
            Linkar <Link />
          </Button>
        ) : (
          <div className="flex flex-row justify-between w-full animat fade-in duration-500">
            <Button variant="outline" onClick={() => onRemove()}>
              Apagar <Unlink />
            </Button>
            <Button variant="default" onClick={() => onOpen()}>
              Abrir <ExternalLink />
            </Button>
          </div>
        )}
      </CardFooter>
    </Card>
  );
}
export const LinkPopup = React.memo(LinkPopupComponent);
