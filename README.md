# Pickme Front
Reverse Head Platform Dev Repository

## Git Convention

### Git WorkFlow
* 개발과 관련된 모든 이야기는 [Issues](https://github.com/DND-PickMe/pickme-back/issues)에서 진행합니다.

    * 급한 용무는 우선 순위에 따라서 카카오톡 또는 슬랙과 같은 메신저를 이용합니다.

* API 및 모델링 명세를 주기적으로 최신화하면서 `README.md`를 잘 관리합니다.

* **Fork**를 통한 PR을 지향합니다.

* 아래와 같은 Git Workflow를 지향하며 지키려고 노력합니다. ([참고](https://nvie.com/posts/a-successful-git-branching-model/?))

    <img width=750, height=850, src="https://camo.githubusercontent.com/7f2539ff6001fe7700853313e7cdb7fd4602e16a/68747470733a2f2f6e7669652e636f6d2f696d672f6769742d6d6f64656c4032782e706e67">

### Commit Message
- 커밋 메시지의 시작에 [Label]을 붙입니다. [Label]은 github의 Label과 동일합니다.
- 첫 글자는 대문자를 사용합니다.
- example
  - Fix 버그 수정 #{issue number}

<details> 
<summary>라벨 설명</summary>
<ul>
  <li> Fix : 버그를 고쳤을 때 </li>
  <li> Convention : 코드 포맷팅 </li>
  <li> Docs : README 등의 문서화 </li>
  <li> Refactoring : 코드 리팩토링 </li>
  <li> Add : 기능 추가 </li>
  <li> Question : 질문 </li>
  <li> Test : 테스트 코드 추가 </li>
</ul>
</details>
