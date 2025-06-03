import prisma from '@/lib/db';

async function main() {
  // 카테고리 생성
  const categories = await prisma.category.createMany({
    data: [
      { name: 'JavaScript' },
      { name: 'TypeScript' },
      { name: 'React' },
      { name: 'NextJS' },
    ],
  });
  console.log('🚀 main categories:', categories);

  // 유저 생성
  const user = await prisma.user.create({
    data: {
      name: 'user1',
      email: 'user1@example.com',
      password: 'password1',
    },
  });

  // 게시글 생성
  await prisma.post.createMany({
    data: [
      {
        title: '호이스팅의 원리',
        content: `JavaScript에서 호이스팅(Hoisting)은 변수 선언과 함수 선언이 해당 스코프의 최상단으로 끌어올려지는 동작을 의미합니다.

var, function 키워드로 선언된 변수와 함수는 런타임 전에 메모리에 먼저 등록되어 참조가 가능하지만, let, const로 선언한 변수는 TDZ(Temporal Dead Zone)에 의해 초기화 전 접근 시 ReferenceError가 발생합니다.

예:
console.log(a); // undefined
var a = 5;

console.log(b); // ReferenceError
let b = 10;

이처럼 호이스팅은 변수 선언만 끌어올려지며, 초기화는 코드 흐름대로 진행된다는 점에 주의해야 합니다.`,
        category_id: 1,
        user_id: user.user_id,
      },
      {
        title: '디스트럭처링(destructuring)',
        content: `디스트럭처링(Destructuring)은 배열이나 객체에서 값을 추출해 변수에 쉽게 할당할 수 있도록 하는 JavaScript 문법입니다.

배열 예:
const [a, b] = [1, 2];
console.log(a); // 1

객체 예:
const user = { name: 'John', age: 30 };
const { name, age } = user;
console.log(name); // John

기본값 설정, 중첩 구조 추출, 별칭 지정 등 다양한 패턴으로 가독성과 효율을 높일 수 있는 문법입니다.`,
        category_id: 1,
        user_id: user.user_id,
      },
      {
        title: '스코프와 실행컨텍스트',
        content: `스코프(Scope)는 변수에 접근할 수 있는 유효 범위를 의미합니다. JavaScript에는 전역 스코프, 함수 스코프, 블록 스코프가 있습니다.

실행 컨텍스트(Execution Context)는 코드가 실행되는 환경을 의미하며, 함수가 호출될 때마다 생성됩니다. 컨텍스트는 Lexical Environment를 포함하며, 변수, 함수 선언, this 바인딩 등의 정보를 포함합니다.

코드 실행 흐름은 다음 순서로 이루어집니다:
1. 실행 컨텍스트 생성
2. 변수 환경, 스코프 체인 구성
3. 코드 실행 단계 (선언 -> 초기화 -> 실행)

이 과정을 통해 JS 엔진은 스코프 체인을 따라 변수나 함수를 탐색하게 됩니다.`,
        category_id: 1,
        user_id: user.user_id,
      },
      {
        title: '클로저',
        content: `클로저(Closure)란 외부 함수의 변수에 접근할 수 있는 내부 함수를 의미합니다.

예:
function outer() {
  let count = 0;
  return function inner() {
    count++;
    console.log(count);
  }
}
const counter = outer();
counter(); // 1
counter(); // 2

위 코드에서 inner 함수는 outer 함수의 변수 count에 계속 접근할 수 있습니다. 이런 클로저는 데이터 은닉, 함수형 프로그래밍, 이벤트 핸들링 등에 널리 사용됩니다.`,
        category_id: 1,
        user_id: user.user_id,
      },
      {
        title: '유니언과 리터럴',
        content: `TypeScript에서 유니언 타입(Union Type)은 여러 타입 중 하나가 될 수 있음을 나타냅니다.

예:
let value: string | number;
value = 'hello'; // ✅
value = 42;      // ✅

리터럴 타입(Literal Type)은 특정 값만 가질 수 있는 타입입니다.

예:
type Direction = 'left' | 'right' | 'up' | 'down';
let move: Direction;
move = 'up';     // ✅
move = 'center'; // ❌ Error

리터럴 타입은 유니언과 함께 사용하면 타입 안정성을 높이는 데 효과적이며, 제한된 값만 허용하는 API 설계 등에 자주 활용됩니다.`,
        category_id: 2,
        user_id: user.user_id,
      },
      {
        title: '배열과 튜플',
        content: `TypeScript에서 배열은 동일한 타입의 요소 목록이며, 튜플은 고정된 길이와 각 요소의 타입이 지정된 배열입니다.

📌 배열 예시:
let names: string[] = ['Alice', 'Bob'];

📌 튜플 예시:
let person: [string, number] = ['Alice', 30];
// person[0]은 string, person[1]은 number

튜플은 구조적 데이터를 명확히 표현할 수 있어서 React의 useState, API 응답 등에서 자주 활용됩니다.`,
        category_id: 2,
        user_id: user.user_id,
      },
      {
        title: '제네릭(Generic)',
        content: `제네릭(Generic)은 함수나 클래스에서 타입을 고정하지 않고, 사용하는 시점에 타입을 주입받아 유연하고 재사용 가능한 코드를 작성할 수 있게 해줍니다.

예:
function identity<T>(value: T): T {
  return value;
}

identity<string>('hello'); // 반환 타입: string
identity<number>(123);     // 반환 타입: number

배열 예시:
function getFirst<T>(arr: T[]): T {
  return arr[0];
}

제네릭은 타입 안정성을 유지하면서도 다양한 타입에 대해 동작하는 코드를 작성할 수 있어, 라이브러리 및 유틸 함수 구현에 자주 사용됩니다.`,
        category_id: 2,
        user_id: user.user_id,
      },
      {
        title: 'JSX and Component',
        content: `JSX는 JavaScript XML의 줄임말로, React에서 UI를 선언적으로 작성할 수 있도록 해주는 문법입니다. HTML과 유사하지만, JavaScript의 표현식도 사용할 수 있습니다.

예:
const element = <h1>Hello, React!</h1>;

컴포넌트(Component)는 UI의 재사용 가능한 조각입니다. 함수형 컴포넌트를 통해 UI를 독립적으로 관리하고 조합할 수 있습니다.

예:
function Welcome(props) {
  return <h1>안녕하세요, {props.name}님!</h1>;
}

React는 컴포넌트 기반 아키텍처를 통해 코드의 재사용성과 유지보수성을 높여줍니다.`,
        category_id: 3,
        user_id: user.user_id,
      },
      {
        title: 'React Hooks',
        content: `React Hooks는 함수형 컴포넌트에서 상태 관리 및 생명주기 로직을 사용할 수 있게 해주는 기능입니다.

대표적인 Hook:
- useState: 컴포넌트 내 상태 관리
- useEffect: 컴포넌트 생명주기 대응
- useRef: DOM 참조 혹은 값 유지
- useMemo, useCallback: 성능 최적화

예:
const [count, setCount] = useState(0);

useEffect(() => {
  console.log('컴포넌트가 마운트됨');
}, []);

Hooks를 통해 클래스 없이도 복잡한 상태 관리 및 사이드 이펙트를 처리할 수 있습니다.`,
        category_id: 3,
        user_id: user.user_id,
      },
      {
        title: 'React Routing',
        content: `React Router는 SPA(Single Page Application)에서 페이지 전환을 가능하게 하는 라우팅 라이브러리입니다.

기본 개념:
- Route: URL에 따라 렌더링할 컴포넌트 정의
- Link: 페이지 이동용 컴포넌트
- useNavigate: 프로그래밍 방식으로 페이지 이동

예:
<Route path="/about" element={<About />} />

<Link to="/about">About 페이지로 이동</Link>

React Router를 통해 새로고침 없이도 자연스러운 페이지 이동이 가능하며, 동적 라우팅, 중첩 라우팅 등 다양한 기능도 제공합니다.`,
        category_id: 3,
        user_id: user.user_id,
      },
      {
        title: '배포와 storybook',
        content: `React 앱을 배포하는 방법은 다양합니다. 대표적으로 Vercel, Netlify, GitHub Pages, Firebase Hosting 등을 사용할 수 있습니다.

배포 전 빌드:
\`\`\`bash
npm run build
\`\`\`

그 외에도 Storybook을 통해 컴포넌트 단위로 UI를 시각화하고 테스트할 수 있습니다.

설치:
\`\`\`bash
npx storybook@latest init
\`\`\`

Storybook은 디자인 시스템을 구축하거나, UI 변경 사항을 빠르게 리뷰할 수 있게 해주는 도구입니다. 배포는 Chromatic을 통해 자동화할 수 있습니다.`,
        category_id: 3,
        user_id: user.user_id,
      },
      {
        title: 'Layout, Page, Route, Link',
        content: `Next.js는 파일 기반 라우팅을 사용하며, \`pages\` 또는 App Router 구조에서는 \`app\` 디렉토리로 구성됩니다.

✅ 페이지와 라우트:
- \`/pages/about.tsx\` → \`/about\` 라우트 생성
- 동적 라우트: \`/pages/posts/[id].tsx\` → \`/posts/1\`, \`/posts/abc\`

✅ Link 컴포넌트:
Next의 \`<Link>\` 컴포넌트는 클라이언트 측 라우팅을 가능하게 해줍니다.
\`\`\`tsx
import Link from 'next/link';
<Link href="/about">About</Link>
\`\`\`

✅ Layout 구성 (App Router 기준):
\`app/layout.tsx\` 파일에 공통 레이아웃을 작성하고, 각 \`page.tsx\`에 개별 화면을 구현합니다.
\`\`\`tsx
// app/layout.tsx
export default function RootLayout({ children }) {
  return (
    <html>
      <body>
        <Header />
        {children}
        <Footer />
      </body>
    </html>
  );
}
\`\`\`

이 구조는 유지보수성과 재사용성을 높입니다.`,
        category_id: 4,
        user_id: user.user_id,
      },
      {
        title: 'CSR, SSR, SSG, ISR',
        content: `Next.js는 다양한 렌더링 방식을 지원하여 상황에 맞는 최적화 전략을 선택할 수 있습니다.

1. CSR (Client Side Rendering)
   - 컴포넌트가 클라이언트에서 렌더링됨
   - React의 일반 SPA 방식
   - 예: useEffect로 데이터 fetch

2. SSR (Server Side Rendering)
   - 요청 시마다 서버에서 HTML 생성
   - \`getServerSideProps\` 사용
   - SEO와 실시간 데이터에 유리

3. SSG (Static Site Generation)  
   - 빌드 시 HTML 생성 (정적 파일)
   - \`getStaticProps\` 사용
   - 빠른 로딩, 캐싱 가능

4. ISR (Incremental Static Regeneration)  
   - SSG + 유효시간 갱신
   - \`revalidate\` 옵션으로 정적 파일 재생성

예:
\`\`\`ts
export const getStaticProps = async () => {
  const data = await fetch(...);
  return {
    props: { data },
    revalidate: 60, // ISR: 60초마다 갱신
  };
}
\`\`\`

각 방식은 프로젝트 특성과 SEO/성능 요구에 맞게 선택해야 합니다.`,
        category_id: 4,
        user_id: user.user_id,
      },
      {
        title: 'Next-Auth',
        content: `NextAuth.js는 Next.js를 위한 인증 솔루션으로, OAuth, Email, Credentials 등 다양한 방식의 인증을 쉽게 구현할 수 있게 해줍니다.

✅ 설치:
\`\`\`bash
npm install next-auth
\`\`\`

✅ 기본 설정:
- \`pages/api/auth/[...nextauth].ts\`: API 라우트로 인증 핸들링
- Provider 설정 예시 (GitHub):
\`\`\`ts
import NextAuth from 'next-auth';
import GitHubProvider from 'next-auth/providers/github';

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
});
\`\`\`

✅ 클라이언트 사용:
\`\`\`tsx
import { signIn, signOut, useSession } from 'next-auth/react';

const { data: session } = useSession();

return session ? (
  <>
    <p>Welcome {session.user.name}</p>
    <button onClick={() => signOut()}>Sign out</button>
  </>
) : (
  <button onClick={() => signIn()}>Sign in</button>
);
\`\`\`

NextAuth는 쿠키 기반 인증을 자동 처리하며, OAuth 연동과 세션 관리도 간편합니다.`,
        category_id: 4,
        user_id: user.user_id,
      },
    ],
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(() => {
    prisma.$disconnect();
  });
