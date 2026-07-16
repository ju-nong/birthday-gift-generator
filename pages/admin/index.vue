<template>
	<h1 class="title">어 준용이 어서오고</h1>

	<nav class="vertical-menu">
		<ul class="vertical-menu__list">
			<li class="vertical-menu__item">
				<NuxtLink
					to="/admin/user"
					class="vertical-menu__link vertical-menu__link"
				>
					<span class="vertical-menu__text">사용자 등록</span>
					<i class="vertical-menu__icon" aria-hidden="true">👉</i>
				</NuxtLink>
			</li>
			<li class="vertical-menu__item">
				<a href="#quiz" class="vertical-menu__link">
					<span class="vertical-menu__text">문제 등록</span>
					<i class="vertical-menu__icon" aria-hidden="true">👉</i>
				</a>
			</li>
			<li class="vertical-menu__item">
				<a href="#gift" class="vertical-menu__link">
					<span class="vertical-menu__text">생일선물 등록</span>
					<i class="vertical-menu__icon" aria-hidden="true">👉</i>
				</a>
			</li>
		</ul>
	</nav>
</template>

<script setup></script>

<style scoped lang="scss">
// 변수 정의
$color-primary: #576d95;
$color-text: #2c3e50;
$color-border: #eee;
$color-bg-hover: #fcfcfc;
$transition-speed: 0.2s;

// BEM 블록(Block): 세로형 메뉴 전체를 감싸는 컨테이너
.vertical-menu {
	width: 100%;
	margin: 2rem auto;
	background-color: #fff;
	border: 1px solid $color-border;
	border-radius: 8px;
	box-shadow: 0 2px 8px rgba(0, 0, 0, 0.05);
	overflow: hidden;

	// 요소(Element): 리스트 자체
	&__list {
		list-style: none;
		margin: 0;
		padding: 0;
	}

	// 요소(Element): 각 행(Row)을 담당하는 아이템
	&__item {
		// 마지막 아이템을 제외하고 하단 테두리 추가
		&:not(:last-child) {
			border-bottom: 1px solid $color-border;
		}
	}

	// 요소(Element): 클릭 영역 전체를 차지하는 링크
	&__link {
		display: flex;
		justify-content: space-between; // 텍스트는 왼쪽, 아이콘은 오른쪽에 배치
		align-items: center;
		padding: 1.2rem 1.5rem;
		color: $color-text;
		text-decoration: none;
		font-size: 1rem;
		font-weight: 500;
		transition:
			background-color $transition-speed ease,
			color $transition-speed ease;

		&:hover {
			background-color: $color-bg-hover;
			color: $color-primary;

			// 호버 시 오른쪽 화살표 아이콘을 살짝 이동시키는 센스 효과
			.vertical-menu__icon {
				transform: translateX(3px);
				color: $color-primary;
			}
		}

		// 수식어(Modifier): 활성화(선택)된 메뉴 상태
		&--active {
			background-color: lighten($color-primary, 48%); // 연한 블루 톤 배경
			color: $color-primary;
			font-weight: 700;

			.vertical-menu__icon {
				color: $color-primary;
			}
		}
	}

	// 요소(Element): 텍스트 영역
	&__text {
		flex: 1;
	}

	// 요소(Element): 우측 화살표 아이콘
	&__icon {
		font-style: normal;
		color: #ccc;
		font-weight: bold;
		transition:
			transform $transition-speed ease,
			color $transition-speed ease;
	}
}
</style>
