const PostPageLoadingSkeleton = () => {
  return (
    <div className="container mx-auto my-10 font-poppins">
      <div className="animate-pulse">
        <div className="h-8 bg-gray-300 w-1/4 mb-4"></div>
        <div className="h-6 bg-gray-300 w-1/2 mb-2"></div>
        <div className="h-4 bg-gray-300 w-1/3 mb-2"></div>
      </div>
      <div className="sm:w-[664px] lg:w-[964px] border-r-2">
        <div className="h-[400px] lg:h-[632px] bg-gray-300"></div>
        <div className="my-10 bg-gray-300 h-32 w-full"></div>
      </div>
    </div>
  );
};

export default PostPageLoadingSkeleton;
