// 예시: 블로그 목록을 가져오는 구조
export default async function Home() {
  // 1. Supabase에서 블로그 포스트를 가져오는 로직 추가
  // 2. 가져온 데이터를 화면에 그리는(Mapping) 로직 추가
  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold">내 블로그 목록</h1>
      {/* 여기에 블로그 글들이 나타나야 합니다 */}
    </div>
  );
}