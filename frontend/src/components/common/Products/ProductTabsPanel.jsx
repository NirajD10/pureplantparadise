import React from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";

function ProductTabsPanel({ description, reviews }) {
  return (
    <div className="flex flex-col justify-center items-center md:px-12">
      <Tabs defaultValue="description" className="w-full">
        <TabsList>
          <TabsTrigger value="description">Description</TabsTrigger>
          <TabsTrigger value="reviews">Reviews</TabsTrigger>
        </TabsList>
        <TabsContent value="description">
          <p
            className="text-[#121212] py-3"
            dangerouslySetInnerHTML={{ __html: description }}
          ></p>
        </TabsContent>
        <TabsContent value="reviews">{reviews}</TabsContent>
      </Tabs>
    </div>
  );
}

export default ProductTabsPanel;
